import { AuthenticatedNavBar } from '@/components/AuthenticatedNavBar'

export default function MainLayout({
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
