import { TAboutUs } from './aboutus.interface';
import { AboutUsModel } from './aboutus.model';

const getAboutUsFromDB = async () => {
  let content = await AboutUsModel.findOne();
  if (!content) {
    content = await AboutUsModel.create({
      title: 'Crafting Next-Gen Digital Products',
      subtitle: 'We blend strategy, design, and technology to build extraordinary user experiences.',
      stats: [
        { label: 'Projects Completed', value: '150+' },
        { label: 'Client Satisfaction', value: '99%' },
        { label: 'Design Awards', value: '12' },
      ],
      values: [
        { title: 'User-Centric Design', description: 'Every pixel serves a functional purpose for end users.', iconName: 'Users' },
        { title: 'Performance First', description: 'Fast, responsive, and robust digital systems.', iconName: 'Zap' },
      ],
    });
  }
  return content;
};

const updateAboutUsInDB = async (payload: Partial<TAboutUs>) => {
  let content = await AboutUsModel.findOne();
  if (!content) {
    content = await AboutUsModel.create(payload);
  } else {
    content = await AboutUsModel.findByIdAndUpdate(content._id, payload, { new: true });
  }
  return content;
};

export const AboutUsServices = {
  getAboutUsFromDB,
  updateAboutUsInDB,
};
