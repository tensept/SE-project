"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatDate, EventClickArg, EventApi , EventInput } from "@fullcalendar/core";
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
  const calendarRef = useRef<FullCalendar | null>(null); // Ref for FullCalendar instance
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const selectedDate = selectInfo.start; // Access the selected date
    setSelectedDate(selectedDate); // Save the selected date in state
    setIsDialogOpen(true); // Open the dialog for adding events
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

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (newEventTitle && selectedDate) {
      const calendarApi = calendarRef.current?.getApi(); // Access FullCalendar instance
      if (calendarApi) {
        calendarApi.addEvent({
          id: `${selectedDate.toISOString()}-${newEventTitle}`,
          title: newEventTitle,
          start: selectedDate,
          allDay: true,
        });
      }

      setIsDialogOpen(false); // Close dialog
      setNewEventTitle(""); // Reset input
    }
  };

  const navigateToDiary = () => {
    if (selectedDate) {
        const formattedDate = selectedDate.toLocaleDateString("en-CA"); // Format เป็น YYYY-MM-DD
        router.push(`/diary/${formattedDate}`);
    }
  };

  return (
    <div style={{ backgroundColor: "#fff4f5", minHeight: "100vh" }}>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12">
          <div className="py-10 text-2xl text-black font-extrabold px-7">
            Calendar Events
          </div>
          <ul className="space-y-4">
            {currentEvents.length === 0 && (
              <div className="italic text-center text-black">
                No Events Present
              </div>
            )}
            {currentEvents.map((event) => (
              <li
                key={event.id}
                className="border border-pink-200 shadow px-4 py-2 rounded-md text-pink-800"
              >
                {event.title}
                <br />
                <span className="text-pink-600">
                  {formatDate(event.start!, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-9/12 mt-8">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            select={handleDateSelect}
            dayHeaderContent={(headerInfo) => (
                <span className="text-black font-bold border-b border-black">
                  {headerInfo.text}
                </span>
              )}
            dayCellContent={(cellInfo) => (
                <span className="text-black">{cellInfo.dayNumberText}</span>
            )}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)} // Synchronize state
          />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="border border-pink-200 p-3 rounded-md text-lg"
            />
            <div className="flex space-x-4 mt-4">
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
