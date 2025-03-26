import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  { title: "text", value: "text value" },
  { title: "tex4", value: "text value2" },
  { title: "tex3", value: "text value3" },
  { title: "text4", value: "text value4" },
];

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {data.map((item, i) => (
            <TableHead className="w-[100px]" key={i}>
              {" "}
              {item.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {data.map((invoice) => (
          <TableRow key={invoice.title}>
            <TableCell className="font-medium hover:bg-secondary">
              {invoice.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
