export function useRedirect({ from, to }: { from: string; to: string }) {
  const { pathname, state } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (pathname === from) {
      console.log(`redirecting from ${from} to ${to}`)
      navigate(to, { state })
    }
  }, [pathname])
}
