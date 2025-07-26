import React from "react";
import styled from "@emotion/styled";
import { Monitor, Mouse, Globe, Code, Palette, Zap } from "lucide-react";

const FloatingContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const FloatingIcon = styled.div<{
	delay: number;
	duration: number;
	distance: number;
	gradient: string;
}>`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${(props) => props.gradient};
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 20px;
	padding: 16px;
	animation: floatAround ${(props) => props.duration}s ease-in-out infinite;
	animation-delay: ${(props) => props.delay}s;
	box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
	transition: all 0.3s ease;

	&:hover {
		transform: scale(1.15);
		box-shadow: 0 16px 50px rgba(0, 0, 0, 0.25);
	}

	@keyframes floatAround {
		0%,
		100% {
			transform: translateY(0px) translateX(0px) rotate(0deg);
			opacity: 0.8;
		}
		25% {
			transform: translateY(-${(props) => props.distance}px)
				translateX(${(props) => props.distance / 2}px) rotate(8deg);
			opacity: 1;
		}
		50% {
			transform: translateY(-${(props) => props.distance / 2}px)
				translateX(-${(props) => props.distance / 3}px) rotate(-5deg);
			opacity: 0.9;
		}
		75% {
			transform: translateY(${(props) => props.distance / 3}px)
				translateX(${(props) => props.distance / 4}px) rotate(3deg);
			opacity: 0.95;
		}
	}
`;

const IconWrapper = styled.div<{ iconColor: string }>`
	color: ${(props) => props.iconColor};
	filter: drop-shadow(0 3px 12px rgba(0, 0, 0, 0.3));
`;

interface FloatingElementsProps {
	containerSize?: number;
}

export function FloatingElements({
	containerSize = 500,
}: FloatingElementsProps) {
	const elements = [
		{
			icon: Monitor,
			position: { top: "5%", left: "8%" },
			delay: 0,
			duration: 8,
			distance: 35,
			gradient:
				"linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.8) 100%)",
			iconColor: "#ffffff",
		},
		{
			icon: Mouse,
			position: { top: "15%", right: "12%" },
			delay: 2,
			duration: 10,
			distance: 40,
			gradient:
				"linear-gradient(135deg, rgba(236, 72, 153, 0.9) 0%, rgba(219, 39, 119, 0.8) 100%)",
			iconColor: "#ffffff",
		},
		{
			icon: Globe,
			position: { top: "40%", left: "-5%" },
			delay: 4,
			duration: 12,
			distance: 30,
			gradient:
				"linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(14, 165, 233, 0.8) 100%)",
			iconColor: "#ffffff",
		},
		{
			icon: Code,
			position: { bottom: "8%", right: "10%" },
			delay: 1,
			duration: 9,
			distance: 45,
			gradient:
				"linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.8) 100%)",
			iconColor: "#ffffff",
		},
		{
			icon: Palette,
			position: { top: "80%", left: "0" },
			delay: 3,
			duration: 11,
			distance: 38,
			gradient:
				"linear-gradient(135deg, rgba(251, 191, 36, 0.9) 0%, rgba(245, 158, 11, 0.8) 100%)",
			iconColor: "#ffffff",
		},
		{
			icon: Zap,
			position: { top: "45%", right: "-2%" },
			delay: 5,
			duration: 7,
			distance: 32,
			gradient:
				"linear-gradient(135deg, rgba(168, 85, 247, 0.9) 0%, rgba(147, 51, 234, 0.8) 100%)",
			iconColor: "#ffffff",
		},
	];

	return (
		<FloatingContainer>
			{elements.map((element, index) => {
				const IconComponent = element.icon;
				return (
					<FloatingIcon
						key={index}
						style={element.position}
						delay={element.delay}
						duration={element.duration}
						distance={element.distance}
						gradient={element.gradient}
					>
						<IconWrapper iconColor={element.iconColor}>
							<IconComponent size={32} />
						</IconWrapper>
					</FloatingIcon>
				);
			})}
		</FloatingContainer>
	);
}
