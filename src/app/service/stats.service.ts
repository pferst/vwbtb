import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as moment from 'moment';
import { VertBarChartData } from '../bugsRep/component/stats/vert-bar-chart-data';
import { LinearChartData } from '../bugsRep/component/stats/linear-chart-data';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private subTemp1 = new BehaviorSubject<any>(null);
  dataTemp1$ = this.subTemp1.asObservable(); 

  constructor() { }

  dateToErr(form: any){
    let data = this.getReports();
    //form.range.start = moment(form.range.start).add(1, 'd').toDate();
    //form.range.end = moment(form.range.end).add(1, 'd').toDate();
    if(data.length>0)
    {
      let dataSend: LinearChartData[] = [];
      const filtered = data.filter(object => {
        let date = new Date(object.date);
        date.setDate(date.getDate()-1);

        return date.getTime() >= form.range.start.getTime() && 
        date.getTime() <= form.range.end.getTime() &&
        object.errType == form.errType &&
        object.errInclusion == form.injType
      });
      const dates=this.getRangeDates(form.range.start, form.range.end);
      let item: LinearChartData = {
        name: form.errType+' '+form.injType,
        series: [{
          value: 0,
          name: ''
        }]
      };
      item.series.shift();
      for(let i=0; i < dates.length; i++)
      {
        const fullFiltered = filtered.filter(item => {
          let date = new Date(item.date);
          date.setDate(date.getDate()-1);
          return date.getTime() == dates[i].getTime();
        });
        const seriesItem = {
          value: fullFiltered.length,
          name: dates[i].getDate()+'-'+dates[i].getMonth()+1+'-'+dates[i].getFullYear()
        }
        item.series.push(seriesItem);
      }
      dataSend.push(item);
      console.log(dataSend);
      this.subTemp1.next(dataSend);
    }
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
}
