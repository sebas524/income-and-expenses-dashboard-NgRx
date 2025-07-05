import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-chart',
  template: `<canvas #canvas></canvas>`,
})
export class ChartComponent {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart;

  private _config!: ChartConfiguration;

  @Input() set config(value: ChartConfiguration) {
    this._config = value;
    if (this.canvasRef) {
      this.renderChart();
    }
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  private renderChart() {
    if (!this._config || !this.canvasRef?.nativeElement) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.canvasRef.nativeElement, this._config);
  }
}
