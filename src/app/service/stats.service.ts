import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as moment from 'moment';
import { VertBarChartData } from '../bugsRep/component/stats/vert-bar-chart-data';
import { GroupedChartData } from '../bugsRep/component/stats/linear-chart-data';
import { errors } from '../bugsRep/4form/errTypes';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  //template 1
  private subTemp1 = new BehaviorSubject<any>(null);
  dataTemp1$ = this.subTemp1.asObservable(); 
  //
  //template 2
  private subTemp2 = new BehaviorSubject<any>(null);
  dataTemp2$ = this.subTemp2.asObservable();
  //
  //template 3
  private subTemp3 = new BehaviorSubject<any>(null);
  dataTemp3$ = this.subTemp3.asObservable();
  //
  //for everything
  stages = [
    {
      name: 'BC/CC',
      value: 'bc'
    },
    {
      name: 'Fuler',
      value: 'fuler'
    },
    {
      name: 'PVC',
      value: 'pvc'
    },
    {
      name: 'VBH/KTL',
      value: 'vbh'
    }
  ];
  //

  constructor() { }

  dateToErr(form: any){
    let data = this.getReports();
    let dataSend: VertBarChartData[] = [];
    //form.range.start = moment(form.range.start).add(1, 'd').toDate();
    //form.range.end = moment(form.range.end).add(1, 'd').toDate();
    if(data && data.length>0)
    {
      const filtered = data.filter(object => {
        let date = new Date(object.date);
        date.setDate(date.getDate()-1);

        return date.getTime() >= form.range.start.getTime() && 
        date.getTime() <= form.range.end.getTime() &&
        object.errType == form.errType &&
        object.errInclusion == form.injType
      });
      console.log(filtered); 
      if(filtered)
      {
        const dates=this.getRangeDates(form.range.start, form.range.end);
        console.log("cokolwiek: ",dates);
        for(let i=0; i < dates.length; i++)
        {
          const fullFiltered = filtered.filter(item => {
            let date = new Date(item.date);
            date.setDate(date.getDate()-1);
            return date.getTime() == dates[i].getTime();
          });
          const month = String(dates[i].getMonth()+1);
          const item: VertBarChartData = {
            name: dates[i].getDate()+'-'+month+'-'+dates[i].getFullYear(),
            value: fullFiltered.length
          }
          dataSend.push(item);
        }
      }
    }
    this.subTemp1.next(dataSend);
  }
  partToErr(form: any){
    let data = this.getDataInTime(form.range1.start, form.range1.end);
    let dataSend: GroupedChartData[] = [];
    if(data && data.length>0)
    {
      for(let i = 0; i < form.carPart.length; i++)
      {
        let el: GroupedChartData = {
          name: form.carPart[i],
          series: [{
            name: '',
            value: 0
          }]
        };
        el.series.shift();
        console.log(el);
        const filteredPart = data.filter(report => {
          return report.carPart == form.carPart[i];
        });
        for(let k = 0; k < this.stages.length ; k++)
        {
          const filteredStages = filteredPart.filter(item =>{
            return item.procStage == this.stages[k].value;
          });
          let filteredErrors= [];
          let count = 0;
          for(let j = 0; j < form.errType.length; j++ )
          {
            filteredErrors = filteredStages.filter(item =>{
              return item.errType == form.errType[j];
            });
            count+=filteredErrors.length;
          }
          const ser = {
            name: this.stages[k].name,
            value: count
          };
          el.series.push(ser);
        }
        dataSend.push(el);
      }
    }
    console.log(dataSend);
    this.subTemp2.next(dataSend);
  }
  circle(form : any){
    let data = this.getDataInTime(form.range1.start, form.range1.end);
    let dataSend: VertBarChartData[] = [];
    if(data && data.length>0)
    {
      for(let  i = 0; i < errors.length; i++)
      {
        const filtered = data.filter(err => {
          return err.errType == errors[i].name;
        });
        const saved: VertBarChartData = {
          name: errors[i].name,
          value: filtered.length
        };
        dataSend.push(saved);
      }
    }
    console.log(dataSend);
    this.subTemp3.next(dataSend);
  }
  getReports(): any{
    const read = localStorage.getItem('Reports');
    let data = null;
    if(read && read!=null && read.length>0)
    {
      data = JSON.parse(read);
    }
    return data;
  }
  getRangeDates(start: Date, end: Date): any{
    let dates = [];
    let currDate: Date = start;
    while(currDate.getTime() < end.getTime()){
      dates.push(currDate);
      currDate = moment(currDate).add(1, 'd').toDate();
    }
    return dates;
  }
  getDataInTime(start: Date, end: Date): any
  {
    let data = this.getReports();
    const filtered = data.filter(object => {
      let date = new Date(object.date);
      date.setDate(date.getDate()-1);

      return date.getTime() >= start.getTime() && 
      date.getTime() <= end.getTime()
    });
    return filtered;
  }
}
