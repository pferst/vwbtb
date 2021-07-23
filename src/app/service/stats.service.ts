import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as moment from 'moment';
import { VertBarChartData } from '../bugsRep/component/stats/vert-bar-chart-data';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private subTemp1 = new BehaviorSubject<any>(null);
  dataTemp1$ = this.subTemp1.asObservable(); 

  constructor() { }

  dateToErr(form: any): string{
    let data = this.getReports();
    let dataSend: VertBarChartData[] = [];
    //form.range.start = moment(form.range.start).add(1, 'd').toDate();
    //form.range.end = moment(form.range.end).add(1, 'd').toDate();
    if(data)
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
      const dates=this.getRangeDates(form.range.start, form.range.end);
      console.log("cokolwiek: ",dates);
      for(let i=0; i < dates.length; i++)
      {
        const fullFiltered = filtered.filter(item => {
          let date = new Date(item.date);
          date.setDate(date.getDate()-1);
          return date.getTime() == dates[i].getTime();
        });
        const item: VertBarChartData = {
          name: dates[i].getDate()+'-'+dates[i].getMonth()+1+'-'+dates[i].getFullYear(),
          value: fullFiltered.length
        }
        dataSend.push(item);
      }
    }
    this.subTemp1.next(dataSend);
    return "Błąd: "+form.errType+"; Wtrącenie: "+form.injType;
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
  getRangeDates(start: Date, end: Date){
    let dates = [];
    let currDate: Date = start;
    while(currDate.getTime() < end.getTime()){
      dates.push(currDate);
      currDate = moment(currDate).add(1, 'd').toDate();
    }
    return dates;
  }
  getDataInTime(start: Date, end: Date)
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
