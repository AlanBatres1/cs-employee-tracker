'use client'

import { Employee } from '@/lib/interfaces/interfaces'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar} from './ui/calendar'
import { updateEmployee } from '@/lib/services/employee-service'

const EmployeeEditView = ({ employee, setEdit }: { employee: Employee, setEdit: (value: boolean) => void }) => {
    const [jobTitle, setJobTitle] = useState(employee.jobTitle || "");
    const [details, setDetails] = useState(employee.details || "");
    const [status, setStatus] = useState(employee.status || "");
    const [hireDate, setHireDate] = useState(employee.hireDate || "");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const formatDateForInput = (date: string) => {
        if (!date) return undefined;
        const [year, month, day] = date.toString().split("-").map(Number);
        return new Date(year, month - 1, day);
    };
    const formatDateFromInput = (date: Date | undefined) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <div>
                <p className="text-sm font-semibold">Job Title</p>
                <Input value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
            </div>

            <div>
                <p className="text-sm font-semibold">Details</p>
                <Input value={details} onChange={e => setDetails(e.target.value)} />
            </div>

            <div>
                <p className="text-sm font-semibold">Status</p>
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className='cursor-pointer'>
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem className='cursor-pointer' value="Active">Active</SelectItem>
                            <SelectItem className='cursor-pointer' value="Sick">Sick</SelectItem>
                            <SelectItem className='cursor-pointer' value="Out of Office">Out of Office</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <p className="text-sm font-semibold">Hire Date</p>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal cursor-pointer", !hireDate && "text-muted-foreground")}
                        >
                            <CalendarIcon />
                             <span>Pick a date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={formatDateForInput(hireDate)}
                            onSelect={(e) => setHireDate(formatDateFromInput(e))}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex justify-between pt-4">
                <Button className='cursor-pointer' onClick={() => setEdit(false)} disabled={saving}>Cancel</Button>
                {employee && <Button className='cursor-pointer' variant="outline" onClick={handleSave} disabled={disableSave}>{saving ? 'Saving...' : 'Save Edits'}</Button>}
            </div>
            {error && <p className="text-red-500 pt-2">{error}</p>}
        </>
    )
}

export default EmployeeEditView