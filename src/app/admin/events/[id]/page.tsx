import EventForm from "../form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  return <EventForm id={id} />;
}
