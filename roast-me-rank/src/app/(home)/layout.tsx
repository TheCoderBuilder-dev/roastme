import { AuthenticatedNavBar } from '@/components/AuthenticatedNavBar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AuthenticatedNavBar />
      {children}
    </>
  )
}
