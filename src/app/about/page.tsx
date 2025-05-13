"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About Task Management</h1>
        <p className="text-xl text-gray-600">
          A modern and intuitive task management application to help you stay organized and productive.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About This App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Task Management is a comprehensive solution designed to help individuals and teams
            track their tasks efficiently. With an intuitive interface and powerful features,
            it makes task management simple and effective.
          </p>
          <p>
            Built with modern web technologies and a focus on user experience, this application
            provides multiple ways to view and manage your tasks, along with insightful
            analytics to help you understand your productivity patterns.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-primary">•</span>
              <div>
                <h3 className="font-semibold">Multiple Views</h3>
                <p className="text-gray-600">View your tasks in card, table, or calendar format</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary">•</span>
              <div>
                <h3 className="font-semibold">Progress Tracking</h3>
                <p className="text-gray-600">Track task progress with visual progress bars</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary">•</span>
              <div>
                <h3 className="font-semibold">Task Analytics</h3>
                <p className="text-gray-600">Gain insights with charts and statistics</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary">•</span>
              <div>
                <h3 className="font-semibold">History Tracking</h3>
                <p className="text-gray-600">Keep track of all task updates and changes</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technologies Used</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>Next.js</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>TypeScript</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>Tailwind CSS</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>Shadcn UI</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>Recharts</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>React</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
