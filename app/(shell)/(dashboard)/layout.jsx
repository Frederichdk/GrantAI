import HeaderSwitch from "@/components/client/HeaderSwitch";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-full flex flex-col ">
      <header className="h-1/9 pl-16 flex items-start">
        <HeaderSwitch />
      </header>
      <main className="flex-1">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
}
