"use client"

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    // Local Storage'dan verileri çek
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleSave = () => {
    // Yeni görevi ekleyip Local Storage'a kaydet
    const newTask = {
      id: Date.now(),
      task: task,
      date: date,
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);

    localStorage.setItem('tasks', JSON.stringify(newTasks));

    // Reset task and date
    setTask('');
    setDate(null);

    togglePopover();
  };

  const handleClear = () => {
    // Verileri temizle ve Local Storage'dan kaldır
    setTasks([]);
    localStorage.removeItem('tasks');
  };

  const handleDelete = (taskId) => {
    // Görevi sil ve Local Storage'dan kaldır
    const updatedTasks = tasks.filter((taskItem) => taskItem.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className='container'>
      <div className='w-full'>
        <Card className="p-4 w-full">
          <h1 className='text-center'>TASK TRACKER</h1>

          <Card  className="relative">
            <Popover  open={isPopoverOpen} onOpenChange={togglePopover}>
              <PopoverTrigger className={`p-4 text-white rounded-xl  w-full ${isPopoverOpen ? 'bg-red-500' : 'bg-black'}`}>  {isPopoverOpen ? 'Close' : 'SHOW ADD TASK BAR'}</PopoverTrigger>
              <PopoverContent  className="space-y-4 w-[500px]" align="center">
                <div className="grid w-full items-center gap-1.5">
                  <Label className="w-full" htmlFor="task">Task</Label>
                  <Input
                    className="w-full"
                    type="text"
                    id="task"
                    placeholder="Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start w-full text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleSave}>Save</Button>
                  <Button variant="outline" onClick={handleClear}>Clear</Button>
                </div>
              </PopoverContent>
            </Popover>
          </Card>

          <div className="space-y-2 mt-4">

                          

                            {tasks.map((taskItem) => (
                              <Card className="p-4">
              <div key={taskItem.id} className="flex justify-between items-center">
              <div>
              <p> {`${taskItem.task} `}  </p>
                <p>{`${taskItem.date ? format(new Date(taskItem.date), "PPP") : 'No date'}`}</p>
              </div>
             
                <Button variant="outline" onClick={() => handleDelete(taskItem.id)}>Delete</Button>
              </div>
              </Card>
            ))}



                        
       


          </div>

        </Card>
      </div>
    </div>
  );
};

export default Todo;
