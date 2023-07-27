import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit{

  modalTitle:string = '';
  showAdd!:boolean;
  showEdit!:boolean;

noExpenses:string='Currently no expenses are added';
expensesArr:any[] = [];
Total:number = 0;
expenses:any = {
  Id : 0,
  Date : '',
  Expense : '',
  Amount : 0
}
constructor(){}

ngOnInit(): void {
  const storage = localStorage.getItem('ExpensesList');
  if (storage != null){
    this.expensesArr = JSON.parse(storage);
  }
}
addExpBtn(){
  this.modalTitle = 'Add Expenses';
  this.showAdd = true;
  this.showEdit = false; 
  this.expenses={
  Id : 0,
  Date : '',
  Expense : '',
  Amount : 0,
}
}
editBtn(exp : any){
  this.expenses = exp;
  this.modalTitle = 'Update Expenses';
  this.showAdd = false;
  this.showEdit = true;
}
addExpenses(){
  this.expenses.Id = this.expensesArr.length + 1;
  this.expensesArr.push(this.expenses);
  localStorage.setItem('ExpensesList',JSON.stringify(this.expensesArr));
}

updateExpense(){
  const exp = this.expensesArr.find(id => id.Id == this.expenses.Id);
  exp.Date = this.expenses.Date;
  exp.Expense = this.expenses.Expense;
  exp.Amount = this.expenses.Amount;
  localStorage.setItem('ExpensesList',JSON.stringify(this.expensesArr));
}


deleteExp(id: number) {
  this.expensesArr = this.expensesArr.filter(expense => expense.Id !== id);
  localStorage.setItem('ExpensesList',JSON.stringify(this.expensesArr));
}

calculateTotal() {
  let total = 0;

  for (let i = 0; i < this.expensesArr.length; i++) {
    total += this.expensesArr[i].Amount;
  }

  this.Total = total;
}
}