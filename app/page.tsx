import { Features } from "@/components/features/features";
import { Hero } from "@/components/hero/hero";
import { ImageTabs } from "@/components/imageTabs/imageTabs";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImageTabs />
      <Features />
    </main>
  );
}
