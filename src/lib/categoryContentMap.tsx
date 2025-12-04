import MathContent from "@/component/category-content/MathContent";
import MindSkillsContent from "@/component/category-content/MindSkillsContent";
import PhysicsContent from "@/component/category-content/PhysicsContent";
import React from "react";

interface ContentProps {
  categorySlug: string;
}
type CategoryComponent = React.FC<ContentProps>;

export const CategoryContentMap: { [key: string]: CategoryComponent } = {
  "mind-skills": MindSkillsContent,
  math: MathContent,
  physics: PhysicsContent,
};
