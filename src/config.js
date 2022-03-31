// eslint-disable-next-line import/no-anonymous-default-export
export default {
  apiHost: "http://127.0.0.1:8000",
  statuses: [
    { name: "todo", label: "Todo" },
    { name: "inprogress", label: "In Progress" },
    { name: "done", label: "Done" },
  ],
  types: [
    { name: "low", label: "Low Priority" },
    { name: "normal", label: "Normal" },
    { name: "urgent", label: "Urgent" },
  ],
};
