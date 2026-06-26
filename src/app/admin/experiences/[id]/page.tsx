import ExperienceForm from "../form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;
  return <ExperienceForm id={id} />;
}
