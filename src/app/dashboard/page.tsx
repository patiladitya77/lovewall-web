import Navbar from "@/components/Navbar";
import OverView from "@/components/OverView";
import Spaces from "@/components/Spaces";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <OverView />
      <Spaces />
    </div>
  );
}
