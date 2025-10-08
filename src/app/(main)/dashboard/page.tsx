import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {PageHeader} from '@/components/page-header';
import {students, assignments, grades} from '@/lib/data';
import {getClassAverage} from '@/lib/helpers';
import {Users, BookMarked, Percent} from 'lucide-react';
import {format, isFuture, parseISO} from 'date-fns';

export default function DashboardPage() {
  const totalStudents = students.length;
  const totalAssignments = assignments.length;
  const classAverage = getClassAverage(grades, assignments);
  const upcomingAssignments = assignments
    .filter(a => isFuture(parseISO(a.dueDate)))
    .sort((a, b) => parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back, here's an overview of your classes."
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
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Assignments that are due soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead className="text-right">Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingAssignments.length > 0 ? (
                  upcomingAssignments.map(assignment => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">
                        {assignment.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {format(parseISO(assignment.dueDate), 'PPP')}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No upcoming deadlines.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
