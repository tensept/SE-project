import { formatDate } from "@fullcalendar/core";

type Event = {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
};

interface EventListProps {
  sortedEvents: Event[];
}

const EventList: React.FC<EventListProps> = ({ sortedEvents }) => {
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
                className="border border-pink-200 shadow-lg hover:shadow-xl transition-shadow px-6 py-4 rounded-lg text-pink-800 bg-white hover:bg-pink-50 mb-4"
                key={event.id}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-semibold break-all">{event.title}</span>
                </div>
                <div className="text-sm text-slate-600">
                  <span>
                    {formatDate(event.start, {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <br />
                  <label className="text-slate-950 text-sm">
                    {formatDate(event.end - 1, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </label>
                </div>
              </li>
            )
          )}
      </ul>
    </div>
  );
};

export default EventList;
