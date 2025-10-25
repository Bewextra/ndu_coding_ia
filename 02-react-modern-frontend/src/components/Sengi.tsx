import './Sengi.css';

interface SengiProps {
  temperature?: number;
  description?: string;
  mode?: 'weather' | 'loading';
}

const Sengi = ({ temperature, description, mode = 'weather' }: SengiProps) => {
  // If in loading mode, show eating animation
  if (mode === 'loading') {
    return (
      <div className="sengi-container">
        <svg 
          className="sengi sengi-loading" 
          width="180" 
          height="180" 
          viewBox="0 0 240 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tail (behind) */}
          <path 
            d="M 30 90 Q 15 85 10 95 Q 8 105 12 110" 
            stroke="#8B7355" 
            strokeWidth="6" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Back legs */}
          <rect x="45" y="110" width="10" height="30" rx="5" fill="#8B7355"/>
          <rect x="65" y="110" width="10" height="30" rx="5" fill="#8B7355"/>
          <ellipse cx="50" cy="142" rx="6" ry="4" fill="#6D5A47"/>
          <ellipse cx="70" cy="142" rx="6" ry="4" fill="#6D5A47"/>
          
          {/* Body (side view - elongated) */}
          <ellipse cx="80" cy="90" rx="55" ry="35" fill="#A0826D"/>
          
          {/* Front legs */}
          <rect x="110" y="105" width="9" height="28" rx="4" fill="#8B7355"/>
          <rect x="125" y="105" width="9" height="28" rx="4" fill="#8B7355"/>
          <ellipse cx="115" cy="135" rx="5" ry="3" fill="#6D5A47"/>
          <ellipse cx="130" cy="135" rx="5" ry="3" fill="#6D5A47"/>
          
          {/* Head (side view) */}
          <ellipse cx="135" cy="75" rx="28" ry="25" fill="#A0826D"/>
          
          {/* Round ear */}
          <ellipse cx="130" cy="55" rx="14" ry="18" fill="#A0826D"/>
          <ellipse cx="130" cy="55" rx="9" ry="13" fill="#C9A88A"/>
          
          {/* Long snout/nose extending forward */}
          <ellipse cx="160" cy="75" rx="25" ry="12" fill="#8B7355"/>
          
          {/* Nose tip (black) */}
          <ellipse cx="183" cy="75" rx="5" ry="6" fill="#2C1810"/>
          
          {/* Whiskers - animated */}
          <g className="whiskers-wiggle">
            <line x1="170" y1="70" x2="200" y2="65" stroke="#2C1810" strokeWidth="1.5"/>
            <line x1="175" y1="75" x2="205" y2="75" stroke="#2C1810" strokeWidth="1.5"/>
            <line x1="170" y1="80" x2="200" y2="85" stroke="#2C1810" strokeWidth="1.5"/>
          </g>
          
          {/* Happy eating eyes */}
          <g className="sengi-eyes">
            <path d="M 140 70 Q 145 67 150 70" stroke="#2C1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <ellipse cx="147" cy="67" rx="2" ry="3" fill="#FFFFFF"/>
          </g>
          
          {/* Eating mouth - animated */}
          <g className="eating-mouth">
            <ellipse cx="165" cy="80" rx="8" ry="6" fill="#2C1810" opacity="0.5"/>
          </g>
          
          {/* Belly detail */}
          <ellipse cx="80" cy="100" rx="40" ry="25" fill="#C9A88A" opacity="0.6"/>
          
          {/* Happy blush */}
          <ellipse cx="128" cy="80" rx="4" ry="3" fill="#FFB6C1" opacity="0.5"/>
          
          {/* Static apple in front of sengi */}
          <g className="apple-static">
            {/* Apple body */}
            <ellipse cx="195" cy="90" rx="12" ry="14" fill="#FF4444"/>
            {/* Apple highlight */}
            <ellipse cx="192" cy="85" rx="4" ry="5" fill="#FF8888" opacity="0.7"/>
            {/* Apple stem */}
            <path d="M 195 76 Q 195 72 197 70" stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Apple leaf */}
            <ellipse cx="198" cy="73" rx="4" ry="2.5" fill="#90EE90" transform="rotate(-30 198 73)"/>
          </g>
        </svg>
      </div>
    );
  }
  
  // Determine sengi's mood based on weather
  const getWeatherCondition = () => {
    const desc = description?.toLowerCase() || '';
    const temp = temperature || 20;

    // Rain conditions
    if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
      return 'rainy';
    }
    
    // Cloudy/sad conditions
    if (desc.includes('cloud') || desc.includes('overcast') || desc.includes('mist') || desc.includes('fog')) {
      return 'cloudy';
    }
    
    // Hot conditions
    if (temp > 30) {
      return 'hot';
    }
    
    // Sunny/happy conditions
    if (desc.includes('clear') || desc.includes('sun')) {
      return 'sunny';
    }
    
    // Snow conditions
    if (desc.includes('snow')) {
      return 'snowy';
    }
    
    // Storm conditions
    if (desc.includes('storm') || desc.includes('thunder')) {
      return 'stormy';
    }
    
    return 'neutral';
  };

  const condition = getWeatherCondition();
  const bodyColor = condition === 'rainy' ? '#7A6350' : condition === 'snowy' ? '#B8A89D' : '#A0826D';
  const snoutColor = condition === 'rainy' ? '#6D5745' : '#8B7355';

  // Different eye expressions based on weather
  const renderEyes = () => {
    switch (condition) {
      case 'sunny':
        // Happy eyes (^_^)
        return (
          <g className="sengi-eyes">
            <path d="M 140 70 Q 145 67 150 70" stroke="#2C1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <ellipse cx="147" cy="67" rx="2" ry="3" fill="#FFFFFF"/>
          </g>
        );
      case 'cloudy':
        // Sad eyes (;_;)
        return (
          <g className="sengi-eyes">
            <ellipse cx="145" cy="72" rx="7" ry="8" fill="#2C1810"/>
            <ellipse cx="147" cy="70" rx="2" ry="3" fill="#FFFFFF"/>
            <path d="M 140 78 Q 143 81 146 82" stroke="#4A90E2" strokeWidth="1.5" fill="none" opacity="0.7"/>
          </g>
        );
      case 'hot':
        // Tired/hot eyes (x_x)
        return (
          <g className="sengi-eyes">
            <ellipse cx="145" cy="71" rx="6" ry="7" fill="#2C1810"/>
            <ellipse cx="147" cy="69" rx="1.5" ry="2" fill="#FFFFFF"/>
            <circle cx="143" cy="71" r="1" fill="#FF6B6B" opacity="0.8"/>
          </g>
        );
      case 'rainy':
        // Neutral but wet eyes
        return (
          <g className="sengi-eyes">
            <ellipse cx="145" cy="71" rx="7" ry="9" fill="#2C1810"/>
            <ellipse cx="147" cy="68" rx="2.5" ry="3.5" fill="#FFFFFF"/>
          </g>
        );
      case 'stormy':
        // Worried eyes (o_o)
        return (
          <g className="sengi-eyes">
            <ellipse cx="145" cy="70" rx="9" ry="11" fill="#2C1810"/>
            <ellipse cx="147" cy="67" rx="3" ry="4" fill="#FFFFFF"/>
          </g>
        );
      default:
        // Normal eyes
        return (
          <g className="sengi-eyes">
            <ellipse cx="145" cy="70" rx="8" ry="10" fill="#2C1810"/>
            <ellipse cx="147" cy="67" rx="3" ry="4" fill="#FFFFFF"/>
          </g>
        );
    }
  };

  return (
    <div className="sengi-container">
      <svg 
        className="sengi" 
        width="150" 
        height="150" 
        viewBox="0 0 220 180" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tail (behind) */}
        <path 
          d="M 30 90 Q 15 85 10 95 Q 8 105 12 110" 
          stroke={snoutColor} 
          strokeWidth="6" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Back legs */}
        <rect x="45" y="110" width="10" height="30" rx="5" fill={snoutColor}/>
        <rect x="65" y="110" width="10" height="30" rx="5" fill={snoutColor}/>
        <ellipse cx="50" cy="142" rx="6" ry="4" fill="#6D5A47"/>
        <ellipse cx="70" cy="142" rx="6" ry="4" fill="#6D5A47"/>
        
        {/* Body (side view - elongated) */}
        <ellipse cx="80" cy="90" rx="55" ry="35" fill={bodyColor}/>
        
        {/* Front legs */}
        <rect x="110" y="105" width="9" height="28" rx="4" fill={snoutColor}/>
        <rect x="125" y="105" width="9" height="28" rx="4" fill={snoutColor}/>
        <ellipse cx="115" cy="135" rx="5" ry="3" fill="#6D5A47"/>
        <ellipse cx="130" cy="135" rx="5" ry="3" fill="#6D5A47"/>
        
        {/* Head (side view) */}
        <ellipse cx="135" cy="75" rx="28" ry="25" fill={bodyColor}/>
        
        {/* Round ear */}
        <ellipse cx="130" cy="55" rx="14" ry="18" fill={bodyColor}/>
        <ellipse cx="130" cy="55" rx="9" ry="13" fill="#C9A88A"/>
        
        {/* Long snout/nose extending forward */}
        <ellipse cx="160" cy="75" rx="25" ry="12" fill={snoutColor}/>
        
        {/* Nose tip (black) */}
        <ellipse cx="183" cy="75" rx="5" ry="6" fill="#2C1810"/>
        
        {/* Whiskers (from side) */}
        <line x1="170" y1="70" x2="200" y2="65" stroke="#2C1810" strokeWidth="1.5"/>
        <line x1="175" y1="75" x2="205" y2="75" stroke="#2C1810" strokeWidth="1.5"/>
        <line x1="170" y1="80" x2="200" y2="85" stroke="#2C1810" strokeWidth="1.5"/>
        
        {/* Eyes based on weather */}
        {renderEyes()}
        
        {/* Mouth based on weather */}
        {condition === 'sunny' && (
          <path d="M 155 82 Q 158 85 161 82" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        )}
        {condition === 'cloudy' && (
          <path d="M 155 85 Q 158 83 161 85" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        )}
        {condition === 'hot' && (
          <ellipse cx="158" cy="84" rx="3" ry="4" fill="#FF9999" opacity="0.6"/>
        )}
        
        {/* Belly detail */}
        <ellipse cx="80" cy="100" rx="40" ry="25" fill="#C9A88A" opacity="0.6"/>
        
        {/* Weather effects */}
        {condition === 'rainy' && (
          <g className="rain-drops">
            <ellipse cx="90" cy="70" rx="2" ry="4" fill="#4A90E2" opacity="0.7"/>
            <ellipse cx="110" cy="80" rx="2" ry="4" fill="#4A90E2" opacity="0.7"/>
            <ellipse cx="70" cy="85" rx="2" ry="4" fill="#4A90E2" opacity="0.7"/>
            <ellipse cx="95" cy="95" rx="2" ry="3" fill="#4A90E2" opacity="0.6"/>
            <ellipse cx="120" cy="75" rx="2" ry="4" fill="#4A90E2" opacity="0.7"/>
          </g>
        )}
        
        {condition === 'hot' && (
          <g className="sweat-drops">
            <ellipse cx="125" cy="60" rx="2.5" ry="4" fill="#6DB3F2" opacity="0.8"/>
            <ellipse cx="140" cy="58" rx="2" ry="3" fill="#6DB3F2" opacity="0.7"/>
            <ellipse cx="148" cy="62" rx="2" ry="3.5" fill="#6DB3F2" opacity="0.8"/>
          </g>
        )}
        
        {condition === 'snowy' && (
          <g className="snowflakes">
            <circle cx="70" cy="65" r="2" fill="#FFFFFF" opacity="0.9"/>
            <circle cx="95" cy="70" r="2.5" fill="#FFFFFF" opacity="0.9"/>
            <circle cx="115" cy="68" r="2" fill="#FFFFFF" opacity="0.9"/>
            <circle cx="85" cy="85" r="2" fill="#FFFFFF" opacity="0.9"/>
            <circle cx="105" cy="82" r="2.5" fill="#FFFFFF" opacity="0.9"/>
          </g>
        )}
        
        {condition === 'stormy' && (
          <g className="lightning-effect">
            <path d="M 100 55 L 95 65 L 100 65 L 96 75" stroke="#FFD700" strokeWidth="2" fill="none" opacity="0.8"/>
          </g>
        )}
        
        {condition === 'sunny' && (
          <g className="happy-blush">
            <ellipse cx="128" cy="80" rx="4" ry="3" fill="#FFB6C1" opacity="0.5"/>
          </g>
        )}
      </svg>
    </div>
  );
};

export default Sengi;

