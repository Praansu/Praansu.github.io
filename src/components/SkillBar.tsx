interface SkillBarProps {
  name: string;
  level: number;
}

export function SkillBar({ name, level }: SkillBarProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700 dark:text-dark-300">{name}</span>
        <span className="text-gray-500 dark:text-dark-400">{level}%</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-dark-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}