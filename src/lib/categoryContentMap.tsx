import MathContent from "@/components/category-content/MathContent";
import MindSkillsContent from "@/components/category-content/MindSkillsContent";
import PhysicsContent from "@/components/category-content/PhysicsContent";
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
