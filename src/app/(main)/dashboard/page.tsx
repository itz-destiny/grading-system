'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {PageHeader} from '@/components/page-header';
import {getClassAverage, getAssignmentAveragesForChart} from '@/lib/helpers';
import {Users, BookMarked, Percent} from 'lucide-react';
import {ClassPerformanceChart} from './components/class-performance-chart';
import {useData} from '@/context/data-provider';
import { useUser } from '@/hooks/use-user';

export default function DashboardPage() {
  const {students, assignments, grades} = useData();
  const { user } = useUser();
  const totalStudents = students.length;
  const totalAssignments = assignments.length;
  const classAverage = getClassAverage(grades, assignments);
  const chartData = getAssignmentAveragesForChart(grades, assignments);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${user?.email || 'teacher'}! Here's an overview of your classes.`}
      />
      <div className="p-4 sm:p-6 md:p-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Currently enrolled in your class
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssignments}</div>
            <p className="text-xs text-muted-foreground">
              Total assignments created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Class Average
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classAverage.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Overall performance of the class
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 sm:p-6 md:p-8 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
            <CardDescription>
              Average score for each assignment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClassPerformanceChart data={chartData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
