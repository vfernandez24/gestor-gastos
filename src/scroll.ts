const handleScroll = (targetRef: React.RefObject<HTMLDivElement>) => {
  if (targetRef.current) {
    targetRef.current.scrollIntoView({ behavior: 'smooth' })
  }
}

export default handleScroll