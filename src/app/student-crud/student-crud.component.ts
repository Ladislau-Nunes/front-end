import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-student-crud',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './student-crud.component.html',
  styleUrl: './student-crud.component.scss'
})

export class StudentCrudComponent {
  StudentArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  nome: string = "";
  curso: string = "";
  taxa: string = "";
  currentStudentID = "";

  constructor(private http: HttpClient ) {
    this.getAllStudent();
  }

  ngOnInit(): void {
   }

  getAllStudent() { 
    this.http.get("http://localhost:8085/api/estudante/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data;
    });
  }
  
  register() {
   // this.isLogin = false; 
   // alert("hi");
    let bodyData = {
      "nome" : this.nome,
      "curso" : this.curso,
      "taxa" : this.taxa,
    };
    this.http.post("http://localhost:8085/api/estudante/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllStudent();
      //  this.name = '';
      //  this.address = '';
      //  this.mobile  = 0;
    });
  }
  setUpdate(data: any) {
   this.nome = data.nome;
   this.curso = data.curso;
   this.taxa = data.taxa;
   this.currentStudentID = data.id;
  }
  UpdateRecords() {
    let bodyData = {
      "nome" : this.nome,
      "curso" : this.curso,
      "taxa" : this.taxa
    };
    
    this.http.put("http://localhost:8085/api/estudante/update"+ "/"+ this.currentStudentID,bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Student Registered Updateddd")
        this.getAllStudent();
    });
  }
 
  save() {
    if(this.currentStudentID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }       
  }
  setDelete(data: any) {
    this.http.delete("http://localhost:8085/api/estudante/delete"+ "/"+ data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Deleted")
      this.getAllStudent();
    });
  }
}
