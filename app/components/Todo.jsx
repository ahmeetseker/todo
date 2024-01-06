"use client"

import React, { useState } from 'react'
import {
    Card,

  } from "@/components/ui/card"

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

  import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



const Todo = () => {
    const [date, setDate] = useState()
  return (
    <Card>
        <Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>


  <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>


    <div>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    </div>


    <div>
    <Button variant="outline">Button</Button>

    </div>
  </PopoverContent>
</Popover>
    
  </Card>
  
  )
}

export default Todo