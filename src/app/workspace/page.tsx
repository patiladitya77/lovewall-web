import WorkSpaceHeader from "@/components/WorkSpaceHeader";
import WorkSpaceSidebar from "@/components/WorkSpaceSidebar";

export default function Home() {
  return (
    <div>
      <div>
        <WorkSpaceHeader />
      </div>
      <div className="flex">
        <div>
          <WorkSpaceSidebar />
        </div>
      </div>
    </div>
  );
}
