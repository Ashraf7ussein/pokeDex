import { Skeleton } from "@radix-ui/themes";

const CardSkeleton = () => {
  return (
    <Skeleton
      height={{ initial: "270px", md: "320px" }}
      width={{ initial: "200px", md: "230px" }}
      className="rounded-lg"
    />
  );
};

export default CardSkeleton;
