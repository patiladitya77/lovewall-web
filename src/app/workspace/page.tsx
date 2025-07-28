import WorkSpaceHeader from "@/components/WorkSpaceHeader";
import WorkSpaceSidebar from "@/components/WorkSpaceSidebar";

export default function Home() {
  return (
    <div className="bg-base-300">
      <div>
        <WorkSpaceHeader />
      </div>
      <div>
        <div>
          <WorkSpaceSidebar />
        </div>
      </div>
    </div>
  );
}
