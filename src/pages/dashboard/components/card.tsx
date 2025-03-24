interface Props {
  data: { icon: any; title: string; value: string };
}
export const Card = ({ data }: Props) => {
  return (
    <div className="w-[270px] h-[173px] bg-secondary border rounded-md p-5">
      <data.icon className="size-[44px] mb-5" />
      <p className="mb-5">{data.title}</p>
      <p className="text-2xl font-bold">{data.value}</p>
    </div>
  );
};
