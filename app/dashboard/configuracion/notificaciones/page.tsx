import NotificationsForm from "../../components/notifications-form/notifications-form";

export default function Notificaciones() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Notificaciones
      </h1>
      <p className="text-muted-foreground">
        Elegí que notificaciones recibir en tu e-mail.
      </p>
      <NotificationsForm />
    </div>
  );
}
