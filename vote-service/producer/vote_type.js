import avro from "avsc";

export default avro.Type.forSchema({
  type: "record",
  name: "vote",
  fields: [
    {
      name: "poll_id",
      type: "string",
    },
    {
      name: "option_id",
      type: "string",
    },
    {
      name: "user_id",
      type: "string",
    },
  ],
});
