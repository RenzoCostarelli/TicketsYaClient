import { Evento } from "@/types/event"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"


export default function EventCard({evento}: {evento:Evento}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{evento.title}</CardTitle>
                <CardDescription>{evento.eventId}</CardDescription>                
            </CardHeader>
        </Card>
    )
}