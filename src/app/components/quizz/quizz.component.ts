import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';
  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: {
    title: string;
    description: string;
    backgroundColor: string;
    fontColor: string;
  } = { title: '', description: '', backgroundColor: '', fontColor: '' };

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(option: string) {
    this.answers.push(option);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex++;
    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer:string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
      console.log(this.answerSelected)
    }
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((previous, current, index, arr) => {
      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
        return previous;
      } else {
        return current;
      }
    })

    return result;
  }

}
