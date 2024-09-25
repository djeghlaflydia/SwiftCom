import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const statistics_Fmessages = ({ selectedPeriod }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    let apiUrl = 'http://localhost/api/nancial_messages.php?type=monthly_stats';

    switch (selectedPeriod) {
      case '/Tous les jours':
        apiUrl = 'http://localhost/api/nancial_messages.php?type=daily_stats';
        break;
      case '/hebdomadaire':
        apiUrl = 'http://localhost/api/nancial_messages.php?type=weekly_stats';
        break;
      case '/mensuel':
        apiUrl = 'http://localhost/api/nancial_messages.php?type=monthly_stats';
        break;
      case '/annuel':
        apiUrl = 'http://localhost/api/nancial_messages.php?type=yearly_stats';
        break;
      case '/depuis toujours': // Nouvelle option
        apiUrl = 'http://localhost/api/nancial_messages.php?type=monthly_stats'; // Appel à l'API pour mensuel par défaut
        break;
      default:
        apiUrl = 'http://localhost/api/nancial_messages.php?type=monthly_stats';
        break;
    }

    axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.data.success) {
        const apiData = response.data.data;
        let labels = [];
        let positiveData = [];
        let negativeData = [];

        setHasData(apiData.length > 0);

        // Traitement des données pour chaque période
        if (selectedPeriod === '/Tous les jours') {
          labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
          positiveData = new Array(24).fill(0);
          negativeData = new Array(24).fill(0);

          apiData.forEach(item => {
            if (item.hour >= 0 && item.hour < 24) {
              positiveData[item.hour] = item.entre_clients;
              negativeData[item.hour] = item.entre_institues;
            }
          });
        } else if (selectedPeriod === '/hebdomadaire') {
          labels = ['Samedi', 'Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
          positiveData = new Array(7).fill(0);
          negativeData = new Array(7).fill(0);

          // Récupérer le jour actuel
          const today = new Date();
          const currentDay = today.getDay(); // 0 pour Dimanche, 6 pour Samedi
          const startOfWeek = currentDay === 0 ? 6 : currentDay - 1;

          apiData.forEach(item => {
            const dayIndex = item.day - 1; // Assure-toi que item.day commence à 1
            if (dayIndex >= startOfWeek) {
              positiveData[dayIndex] += item.positive_responses;
              negativeData[dayIndex] += item.negative_responses;
            }
          });
        } else if (selectedPeriod === '/mensuel' || selectedPeriod === '/depuis toujours') { // Gérer les deux cas
            labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
          positiveData = new Array(12).fill(0);
          negativeData = new Array(12).fill(0);
          apiData.forEach(item => {
            positiveData[item.month - 1] = item.entre_clients;
            negativeData[item.month - 1] = item.entre_institues;
          });
        } else if (selectedPeriod === '/Depuis toujours' || selectedPeriod === '/depuis toujours') { // Gérer les deux cas
            labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
          positiveData = new Array(12).fill(0);
          negativeData = new Array(12).fill(0);
          apiData.forEach(item => {
            positiveData[item.month - 1] = item.entre_clients;
            negativeData[item.month - 1] = item.entre_institues;
          });  
        } else if (selectedPeriod === '/annuel') {
          const currentYear = new Date().getFullYear();
          labels = Array.from({ length: currentYear - 2021 }, (_, i) => `${2022 + i}`);
          positiveData = new Array(labels.length).fill(0);
          negativeData = new Array(labels.length).fill(0);
          apiData.forEach(item => {
            positiveData[item.year - 2022] = item.entre_clients;
            negativeData[item.year - 2022] = item.entre_institues;
          });
        }

        setChartData({
          labels,
          datasets: [
            {
              label: "Entre clients",
              data: positiveData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: "Entre institues",
              data: negativeData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.error('No data found');
        setHasData(false);
      }
    })
    .catch(error => {
      console.error('Error fetching stats:', error);
      setHasData(false);
    });
  }, [selectedPeriod]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <div className='chart-container' style={{ width: '100%', height: '196px' }}>
        {hasData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Aucune donnée disponible pour cette période.</p>
            <p>📉</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default statistics_Fmessages;
