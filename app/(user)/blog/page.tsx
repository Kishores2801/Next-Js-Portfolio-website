import Header from "@/components/Header/Header";
import BlogCoverSection from "@/components/blogPage/BlogCoverSection";
import FeaturedPost from "@/components/blogPage/FeaturedPost";
import RecentPost from "@/components/blogPage/RecentPost";


type Props = {}

export default function Blog({}: Props) {
  return (
    <main className="relative dark:bg-black-100 bg-gray-200 dark:bg-grid-white/[0.035] bg-grid-black/[0.018] text-black dark:text-white flex flex-col overflow-x-hidden z-0">
        <Header/>

      <section className="flex-grow h-full snap-start flex items-center justify-center">
      <BlogCoverSection />
      </section>
      <section className="flex-grow h-full snap-start flex items-center justify-center">
            <FeaturedPost />
      </section>
      <section className="flex-grow h-full snap-start flex items-center justify-center">
            <RecentPost />
      </section>

    </main>
  )
}
