import GuideForm from "../form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditGuidePage({ params }: Props) {
  const { id } = await params;
  return <GuideForm id={id} />;
}
