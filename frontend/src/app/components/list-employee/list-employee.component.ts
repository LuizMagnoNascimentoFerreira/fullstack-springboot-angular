import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees:any = [];
  infoMessage = "oi";
  constructor(private service:MainService) { }
  showNoEmployeeInfo(){
    let alertInfoDiv = document.getElementById("alert-info");
    alertInfoDiv!.style.display="block";
    this.infoMessage = "Nenhum funcionário registrado no momento"
  }
  listEmployees(){
    this.service.listEmployees().subscribe((employees)=>{
      this.employees = employees;
      console.log(this.employees)
      if(this.employees.length == 0){
        this.showNoEmployeeInfo();
      }
    })
  }
  deleteEmployeeById(employeeId:Number){
    this.employees = this.employees.filter((employee:any)=>employee.id != employeeId)
    if(this.employees.length == 0){
      this.showNoEmployeeInfo();
    }
    this.service.deleteEmployeeById(employeeId).subscribe();
  }
  ngOnInit(): void {
    this.listEmployees();
  }

}
