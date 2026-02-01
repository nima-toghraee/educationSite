import MathContentFree from "@/components/category-content-free/MathContent";
import MindSkillsContentFree from "@/components/category-content-free/MindSkillsContent";
import PhysicsContentFree from "@/components/category-content-free/PhysicsContent";

import React from "react";

interface ContentProps {
  categorySlug: string;
}
type CategoryComponent = React.FC<ContentProps>;

export const CategoryContentFreeMap: { [key: string]: CategoryComponent } = {
  "mind-skills": MindSkillsContentFree,
  math: MathContentFree,
  physics: PhysicsContentFree,
};
