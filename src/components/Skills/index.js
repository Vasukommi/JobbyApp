import './index.css'

const Skills = props => {
  const {skillData} = props
  const updateData = {
    imageUrl: skillData.image_url,
    name: skillData.name,
  }
  const {imageUrl, name} = updateData

  return (
    <li className="each-skill">
      <img className="skill-image" alt={name} src={imageUrl} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
