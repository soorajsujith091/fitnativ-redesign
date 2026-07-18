import { useState } from 'react';
import { Calculator, Activity, ArrowRight, RotateCcw } from 'lucide-react';

export default function CalorieCalculator() {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    weight: '',
    height: '',
    activity: '1.2'
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateCalories = (e) => {
    e.preventDefault();
    const { gender, age, weight, height, activity } = formData;
    
    if (!age || !weight || !height) return;

    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = (10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) + 5;
    } else {
      bmr = (10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) - 161;
    }

    const tdee = bmr * parseFloat(activity);
    
    setResult({
      maintain: Math.round(tdee),
      lose: Math.round(tdee - 500),
      gain: Math.round(tdee + 500),
      bmr: Math.round(bmr)
    });
  };

  const resetForm = () => {
    setFormData({
      gender: 'male',
      age: '',
      weight: '',
      height: '',
      activity: '1.2'
    });
    setResult(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
      
      {/* Left Column: Form */}
      <div className="w-full md:w-3/5 p-8 lg:p-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">Diet Calories Calculator</h3>
            <p className="text-gray-500 text-sm">Calculate your daily calorie needs</p>
          </div>
        </div>

        <form onSubmit={calculateCalories} className="space-y-6">
          
          {/* Gender */}
          <div className="flex gap-4">
            <label className="flex-1 cursor-pointer">
              <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange} className="peer sr-only" />
              <div className="text-center py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-medium peer-checked:bg-primary-50 peer-checked:border-primary-500 peer-checked:text-primary-700 transition-all hover:bg-gray-50">
                Male
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange} className="peer sr-only" />
              <div className="text-center py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-medium peer-checked:bg-primary-50 peer-checked:border-primary-500 peer-checked:text-primary-700 transition-all hover:bg-gray-50">
                Female
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
              <div className="relative">
                <input type="number" name="age" value={formData.age} onChange={handleInputChange} min="15" max="100" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="25" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">yrs</span>
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Height</label>
              <div className="relative">
                <input type="number" name="height" value={formData.height} onChange={handleInputChange} min="100" max="250" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="170" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">cm</span>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Weight</label>
              <div className="relative">
                <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} min="30" max="300" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="70" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Level</label>
            <div className="relative">
              <select name="activity" value={formData.activity} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none">
                <option value="1.2">Sedentary (little to no exercise)</option>
                <option value="1.375">Lightly Active (light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately Active (moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very Active (hard exercise 6-7 days/week)</option>
                <option value="1.9">Extra Active (very hard exercise & physical job)</option>
              </select>
              <Activity size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button type="submit" className="flex-1 bg-primary-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
              Calculate Needs <ArrowRight size={18} />
            </button>
            {result && (
              <button type="button" onClick={resetForm} className="px-5 py-3.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center" title="Reset">
                <RotateCcw size={18} />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Right Column: Results */}
      <div className="w-full md:w-2/5 bg-gray-900 text-white p-8 lg:p-12 flex flex-col justify-center">
        {result ? (
          <div className="animate-fade-in">
            <div className="mb-10">
              <span className="text-primary-400 text-sm font-bold tracking-widest uppercase mb-2 block">Your Results</span>
              <h4 className="text-3xl font-display leading-tight mb-2">Maintain Weight</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">{result.maintain}</span>
                <span className="text-gray-400 font-medium">kcal/day</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <div className="text-sm text-gray-300 font-medium mb-1">Weight Loss (-0.5kg/week)</div>
                <div className="text-2xl font-bold text-primary-300">{result.lose} <span className="text-sm font-normal text-gray-400">kcal/day</span></div>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <div className="text-sm text-gray-300 font-medium mb-1">Weight Gain (+0.5kg/week)</div>
                <div className="text-2xl font-bold text-white">{result.gain} <span className="text-sm font-normal text-gray-400">kcal/day</span></div>
              </div>
            </div>
            
            <div className="mt-8 text-center text-xs text-gray-500 font-medium">
              Basal Metabolic Rate (BMR): {result.bmr} kcal/day
            </div>
          </div>
        ) : (
          <div className="text-center h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <Calculator size={32} className="text-gray-500" />
            </div>
            <p className="font-medium text-lg mb-2">No Data Yet</p>
            <p className="text-sm max-w-[250px] mx-auto">Fill in your details and click calculate to see your personalized calorie needs.</p>
          </div>
        )}
      </div>

    </div>
  );
}
