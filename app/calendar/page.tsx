"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatDate, EventClickArg, EventApi } from "@fullcalendar/core";
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

  // Fetch events from the API
  const getEvent = async () => {

  const path = process.env.NEXT_PUBLIC_BACK_END;

    try {
      const response = await fetch(
        `${path}/events?patientId=2&month=${currentMonth+1}&year=${currentYear}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 404) {
        console.log("No diary found for the date");
        return;
      }
      console.log("cm: ",currentMonth);
      console.log("cy: ",currentYear);

      const data = await response.json();
      console.log("Data:", data);
      const safeData = Array.isArray(data) ? data : [];

      // Format API data into FullCalendar format
      const formattedEvents = safeData.map(
        (event: { id: number; date: string; event: string }) => ({
          id: event.id.toString(), // Ensure the ID is a string
          title: event.event,
          start: event.date, // FullCalendar expects an ISO8601 string
          end: event.date, // Assuming it's an all-day event
          allDay: true, // Assuming it's an all-day event (adjust as needed)
        })
      );

      setCurrentEvents(formattedEvents); // Update state with the events
      console.log("CE: ",currentEvents);
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
  };

  const postEvent = async (eventTitle: string, eventDate: string, patientId: number) => {

    const path = process.env.NEXT_PUBLIC_BACK_END;

    try {
      const response = await fetch(`${path}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: eventTitle,
          date: eventDate,
          patientId: patientId, // Ensure patientId is provided if required by your backend
        }),
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          console.log("No diary found for the date");
        } else {
          console.error("Error creating event:", response.statusText);
        }
        return;
      }
  
      console.log("cm: ", currentMonth);
      console.log("cy: ", currentYear);
  
      const data = await response.json();
      console.log("Data:", data);
  
      // Format API data into FullCalendar format
      const formattedEvent = {
        id: data.id.toString(), // Ensure the ID is a string
        title: data.event,
        start: data.date, // FullCalendar expects an ISO8601 string
        end: data.date, // Assuming it's an all-day event
        allDay: true,
      };
  
      setCurrentEvents((prevEvents) => [...prevEvents, formattedEvent]); // Update state
      console.log("Updated Events: ", currentEvents);
    } catch (error) {
      console.error("Error posting event:", error);
    }
  };

  // เหลือ Method Delete ที่ยีงใช้ไม่ได้
  const deleteEvent = async (eventId: number) => {

    const path = process.env.NEXT_PUBLIC_BACK_END;

    try {
      const response = await fetch(`${path}/events/${eventId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        console.error("Error deleting event:", response.statusText);
        return;
      }
  
      console.log(`Event ${eventId} deleted successfully`);
  
      // Remove event from state
      setCurrentEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId.toString())
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
  useEffect(() => {
    getEvent(); // Fetch events when component mounts
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
      console.log(selected.event.id);
      deleteEvent(parseInt(selected.event.id));
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

      // Send the event to your API (or handle locally)
      const sent_event = {
        patientId: 2,
        date: newEvent.start.toISOString(),
        event: newEvent.title,
      };
      console.log("sent_event: ", sent_event);
      calendarApi.addEvent(newEvent); // Add event to FullCalendar
      console.log('Event Start: ', newEvent.end.toISOString());
      postEvent(newEvent.title,newEvent.end.toISOString(),2);
      handleCloseDialog();
    }
  };

  const navigateToDiary = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.start.toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
      router.push(`/diary/${formattedDate}`);
    }
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const filteredEvents = currentEvents.filter((event: EventApi) => {
    const eventMonth = new Date(event.start!).getMonth();
    return eventMonth === currentMonth;
  });
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.start!).getTime() - new Date(b.start!).getTime()
  );
  
  return (
    <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
      <div className="flex w-full px-10 justify-start items-start gap-8 ">
        <div className="w-3/12">
          <div className="py-10 text-2xl font-extrabold px-7">
            Calendar Events
          </div>
          <ul className="space-y-4">
            {sortedEvents.length <= 0 && (
              <div className="italic text-center text-gray-400">
                No Events Present
              </div>
            )}
            {sortedEvents.length > 0 &&
              sortedEvents.map((event: EventApi) => (
                <li
                  className="border border-pink-200 shadow px-4 py-2 rounded-md text-pink-800"
                  key={event.id}
                >
                  {event.title}
                  <br />
                  <label className="text-slate-950">
                    {formatDate(event.end-1!, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </label>
                </li>
              ))}
          </ul>
        </div>

        <div className="w-9/12 mt-8">
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
            eventClick={handleEventClick}
            events={currentEvents} // Set events state as the source
          />
        </div>
      </div>

      {/* Dialog for adding new events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center">
              Add New Event
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleAddEvent}
            className="flex flex-col items-center"
          >
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
              <p className="mt-2 text-sm text-black-500 font-bold">
                ✔️อาหารที่ทานได้ : ปลามีเกล็ด ข้าว ลูกเดือย กล้วยน้ำว้า
                มะละกอสุก ผักปลอดสารพิษ น้ำนมจากพืช น้ำไม่เย็น
              </p>
              <p className="mt-5 text-sm text-black-500 font-bold">
                ❌อาหารแสลง : ชา กาแฟ น้ำเย็น น้ำแข็ง บุหรี่ เหล้า เบียร์
                ข้าวเหนียว ไข่ไก่ ไก่ หมู วัว ปลาไม่มีเกล็ด อาหารหมักดอง ปลาเต็ม
                ปลาร้า มาม่า อาหารทะเล เครื่องในสัตว์ เส้นก๋วยเตียว อาหารแปรรูป
                ปลากระป๋อง
              </p>
              <p className="mt-5 text-sm text-black-100 font-bold">
                🧘ไหว้พระ สวดมนต์ ทำสมาธิ กรวดน้ำให้เจ้ากรรมนายเวร
                ใส่บาตรทุกวันพระ ข้าว 1 ถ้วย กล้วย 1 ทวี
                และเงินตามกำลังวังวันเกิด จันทร์ 15 บาท, อังคาร 8 บาท,
                วันพุธ(กลางวัน) 17 บาท, วันพุธ (กลางคืน) 12 บาท, พฤหัสบดี 19
                บาท, ศุกร์ 21 บาท, เสาร์ 10 บาท, อาทิตย์ 6 บาท
              </p>
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
