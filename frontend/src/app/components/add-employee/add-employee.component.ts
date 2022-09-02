import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeName:string = "";
  skill:string = "";
  skills:string[] = [];
  employee:any;
  hasSkill:boolean = false;
  errorMessage:string = "";
  constructor(private service:MainService) { }
  bothEmpty():boolean{
    return this.emptyName() && this.emptySkill();
  }
  emptyName():boolean{
    let nameInput = document.getElementById("employee-name-input") as HTMLInputElement;    
    return nameInput.value.length == 0;
  }
  emptySkill():boolean{
    let skillInput = document.getElementById("skill-input") as HTMLInputElement;    
    return skillInput.value.length == 0;
  }
  repeatedSkill():boolean{
    let skillInput = document.getElementById("skill-input") as HTMLInputElement;    
    return this.skills.find(skill => skillInput.value.toLowerCase() == skill.toLowerCase()) != undefined;
  }
  showBothEmptyError(){
    let alertErrorDiv = document.getElementById("alert-error");
    alertErrorDiv!.style.display = "block";
    this.errorMessage = "Ambos os campos não podem estar vazios";
    //O alerta de erro desaparece após 3 segundos.
    setTimeout(()=>{
      alertErrorDiv!.style.display = "none";
    },3000);
  }

  showEmptyNameError(){
    let alertErrorDiv = document.getElementById("alert-error");
    alertErrorDiv!.style.display = "block";
    this.errorMessage = "O nome do funcionário não pode estar vazio";
    //O alerta de erro desaparece após 3 segundos.
    setTimeout(()=>{
      alertErrorDiv!.style.display = "none";
    },3000);
  }
 
  showEmptySkillError(){
    let alertErrorDiv = document.getElementById("alert-error");
    alertErrorDiv!.style.display = "block";
    this.errorMessage = "O campo de habilidade não pode estar vazio";
    //O alerta de erro desaparece após 3 segundos.
    setTimeout(()=>{
      alertErrorDiv!.style.display = "none";
    },3000);
  }

  showNoSkillError(){
    let alertErrorDiv = document.getElementById("alert-error");
    alertErrorDiv!.style.display = "block";
    this.errorMessage = "O funcionário não possui habilidades cadastradas";
    //O alerta de erro desaparece após 3 segundos.
    setTimeout(()=>{
      alertErrorDiv!.style.display = "none";
    },3000);
  }

  hideEmptySkillInfo(){
    let alertInfoDiv = document.getElementById("alert-info");
    alertInfoDiv!.style.display = "none";
  }
  addSkillInList(){
    this.skills.push(this.skill)
    this.skill = ""
  }
  addSkill(){
    if(this.bothEmpty()){
      this.showBothEmptyError();
    }else if(this.emptyName()){
      this.showEmptyNameError();
    }else if(this.emptySkill()){
      this.showEmptySkillError();
    }else if(this.repeatedSkill()){
      this.showRepeatedSkillError()
    }else{
      this.hideEmptySkillInfo();
      this.hasSkill = true;
      this.addSkillInList();
    }
  }
  showEmptySkillInfo(){
    let alertInfoDiv = document.getElementById("alert-info");
    alertInfoDiv!.style.display = "block";
  }
  clearFields(){
    this.employeeName = ""
    this.skill = ""
    this.skills = []
  }
  clearNameInput(){
    this.employeeName = ""
  }
  showSaveEmployeeSuccess(){
    let alertSuccessDiv = document.getElementById("alert-success");
    alertSuccessDiv!.style.display = "block"
    setTimeout(()=>{
      alertSuccessDiv!.style.display = "none"
    },3000)
  }
  saveEmployee(){
    if(this.hasSkill){
      this.service.saveEmployee(this.employeeName).subscribe(employee=>{
        for(let skill of this.skills){ 
          this.service.saveSkill(employee.body.id,skill).subscribe()
        }
        this.clearFields();
        this.hasSkill = false;
      })
      this.showSaveEmployeeSuccess();
      this.showEmptySkillInfo();
      
    }else{
      this.showNoSkillError();
    }
   
  }
  showRepeatedSkillError(){
    let alertErrorDiv = document.getElementById("alert-error");
    alertErrorDiv!.style.display = "block";
    this.errorMessage = "Não são permitidas habilidades repetidas";
    //O alerta de erro desaparece após 3 segundos.
    setTimeout(()=>{
      alertErrorDiv!.style.display = "none";
    },3000);
  }
  
  ngOnInit(): void {
  }

}
