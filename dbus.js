let dbus = require("dbus-next");

dbus.setBigIntCompat(true);

const recipient = "<RECIPIENT>" // fill the phone number here

async function signalBot() {
  let bus = dbus.systemBus();
  let obj = await bus.getProxyObject("org.asamk.Signal", "/org/asamk/Signal");
  let iface = obj.getInterface("org.asamk.Signal");
  iface.on("MessageReceived", (timestamp, source, groupID, message, attachments) => {
    console.log("Message", timestamp, source, message, "received in group", groupID.toString("base64"));
    iface.sendMessage(message, [], [recipient]);
  });
}

(async () => {
  console.log(await signalBot());
})().catch((err) => {
  console.error(err);
});
