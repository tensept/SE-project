"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  formatDate,
  EventClickArg,
  EventApi,
  EventInput,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg } from "@fullcalendar/core";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/calendar/ui/dialog";

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event "${selected.event.title}"?`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      const newEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay,
      };

      calendarApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };
  const navigateToDiary = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.start.toLocaleDateString("en-CA"); // Format เป็น YYYY-MM-DD
      router.push(`/diary/${formattedDate}`);
    }
  };

  return (
    <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
      <div className="flex w-full px-10 justify-start items-start gap-8 ">
        <div className="w-3/12">
          <div className="py-10 text-2xl font-extrabold px-7">
            Calendar Events
          </div>
          <ul className="space-y-4">
            {currentEvents.length <= 0 && (
              <div className="italic text-center text-gray-400">
                No Events Present
              </div>
            )}
            {currentEvents.length > 0 &&
              currentEvents.map((event: EventApi) => (
                <li
                  className="border border-pink-200 shadow px-4 py-2 rounded-md text-pink-800"
                  key={event.id}
                >
                  {event.title}
                  <br />
                  <label className="text-slate-950">
                    {formatDate(event.start!, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </label>
                </li>
              ))}
          </ul>
        </div>

        <div className="w-9/12 mt-8 ">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            dayHeaderContent={(headerInfo) => (
              <span className="text-black font-bold ">
                {headerInfo.text}
              </span>
            )}
            dayCellContent={(cellInfo) => (
              <span className="text-black">{cellInfo.dayNumberText}</span>
            )}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("events") || "[]")
                : []
            }
          />
        </div>
      </div>

      {/* Dialog for adding new events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center">Add New Event</DialogTitle>
          </DialogHeader>
            <form onSubmit={handleAddEvent} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="border border-pink-200 p-3 rounded-md text-lg text-center"
            />
            <p className="mt-2 text-sm text-black font-bold text-center">
              📌 ข้อควรปฏิบัติ
            </p>

            <p className="mt-2 text-sm text-black-500 font-bold">
              ✔️อาหารที่ทานได้ : ปลามีเกล็ด ข้าว ลูกเดือย กล้วยน้ำว้า มะละกอสุก
              ผักปลอดสารพิษ น้ำนมจากพืช น้ำไม่เย็น
            </p>
            <p className="mt-5 text-sm text-black-500 font-bold">
              ❌อาหารแสลง : ชา กาแฟ น้ำเย็น น้ำแข็ง บุหรี่ เหล้า เบียร์
              ข้าวเหนียว ไข่ไก่ ไก่ หมู วัว ปลาไม่มีเกล็ด อาหารหมักดอง ปลาเต็ม
              ปลาร้า มาม่า อาหารทะเล เครื่องในสัตว์ เส้นก๋วยเตียว อาหารแปรรูป
              ปลากระป๋อง
            </p>
            <p className="mt-5 text-sm text-black-100 font-bold">
              🧘ไหว้พระ สวดมนต์ ทำสมาธิ กรวดน้ำให้เจ้ากรรมนายเวร
              ใส่บาตรทุกวันพระ ข้าว 1 ถ้วย กล้วย 1 ทวี และเงินตามกำลังวังวันเกิด
              จันทร์ 15 บาท, อังคาร 8 บาท, วันพุธ(กลางวัน) 17 บาท, วันพุธ
              (กลางคืน) 12 บาท, พฤหัสบดี 19 บาท, ศุกร์ 21 บาท, เสาร์ 10 บาท,
              อาทิตย์ 6 บาท
            </p>

            <div className="flex justify-center space-x-4 mt-4">
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-md"
              >
                Add Event
              </button>
              <button
                type="button"
                onClick={navigateToDiary}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Go to Diary
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
