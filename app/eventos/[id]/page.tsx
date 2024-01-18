import s from './page.module.scss'
async function getEventById(id: string) {
    const res = await fetch(`${process.env.apiUrl}/events/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

export default async function Evento({ params }: { params: { id: string } }) {
    const { event } = await getEventById(params.id);
    return (
        <>
            <div className="bg-black w-full h-60"></div>
            <div className="flex self-center w-80 bg-pink-300 mx-auto">
                <div className={s.date_area}>
                    <ul>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                    </ul>
                </div>
                <ul>

                </ul>
            </div>
        </>
    )
}