/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from "@fullcalendar/core";
import { IconTrash } from '@tabler/icons-react'

type Event = {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
};

interface EventListProps {
  sortedEvents: Event[];
  handleDelete: (eventId: number) => void;
}


const EventList: React.FC<EventListProps> = ({ sortedEvents ,handleDelete}) => {
  return (
    <div>
      <ul>
        {sortedEvents.length > 0 &&
          sortedEvents.map(
            (event: {
              id: any;
              title: any;
              start: any;
              end: any;
              allDay: boolean;
            }) => (
              <li
                className="border border-pink-200 shadow-lg hover:shadow-xl transition-shadow px-6 py-4 rounded-lg text-pink-800 bg-white hover:bg-pink-50 mb-4 flex justify-between items-center"
                key={event.id}
              ><div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-semibold break-all">
                    {event.title}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  <label className="text-slate-950 text-sm">
                    {formatDate(event.end - 1, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </label>
                </div>
                </div>
                <div className="cursor-pointer" onClick={() => handleDelete(event.id)}>
                  <IconTrash stroke={2} />
                </div>
              </li>
            )
          )}
      </ul>
    </div>
  );
};

export default EventList;
