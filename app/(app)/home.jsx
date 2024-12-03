import { CardContent, Card } from "@/components/ui/card";

export const Home = () => {
  return (
    <div className="p-4">
      <Card className="w-[300px] px-3 py-3">
        <h2 className="text-4xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Monday
        </h2>
        <div className="flex justify-end items-center">
          <span className="text-sm text-gray-500">12/May/2024</span>
        </div>
      </Card>
    </div>
  );
};
// plan a week
