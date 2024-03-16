import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";

export const Testimonials = () => {
  return (
    <section className="grid place-items-center">
      <h1 className="text-4xl font-bold pt-8">
        What our <i className="text-navy">users</i> say{" "}
        <i className="pi pi-star-fill text-3xl align-middle text-emerald-300 animate-spin"></i>
        <GroupedCircleUsers />
      </h1>
      <span className="p-2">
        More than 200 people from <u>NCR region</u> have used our services to
        benefit as renters or hosts.
      </span>
      <section className="grid text-sm md:text-base md:grid-cols-2 gap-8 p-8">
        <Testimonial
          name="Amrita Singh"
          src="https://i.pravatar.cc/300?img=5"
          text="Great customer service I must say - the drive-up car storage unit was easily accessible and the prices are reasonable."
        />
        <Testimonial
          name="Manvika Madhrey"
          src="https://i.pravatar.cc/300?img=44"
          text="My unused garage is being put on rent thanks to Xtended Space. The best in the market if you want to look for passive income. "
        />
        <Testimonial
          name="Aniket Chandra"
          src="https://i.pravatar.cc/300?img=61"
          text="I was moving out to a different city and wanted to store my furniture and books. Their team helped me out like real bros"
        />
        <Testimonial
          name="Jatin Ganeshwaal"
          src="https://i.pravatar.cc/300?img=8"
          text="I work in a band and we were looking a place to store our equipment. I was able to find really cheap place within few days. I would highly recommend Xtended Space."
        />
      </section>
    </section>
  );
};

const GroupedCircleUsers = () => {
  return (
    <div className="mx-auto w-fit mt-4">
      <AvatarGroup>
        {["5", "44", "61", "8", "23"].map((num) => (
          <Avatar
            key={num}
            image={`https://i.pravatar.cc/300?img=${num}`}
            size="large"
            shape="circle"
          />
        ))}
        <Avatar
          label="200+"
          size="large"
          shape="circle"
          className="text-xs bg-yellow"
        />
      </AvatarGroup>
    </div>
  );
};

const Testimonial = ({
  name,
  src,
  text,
}: {
  name: string;
  src: string;
  text: string;
}) => (
  <article className="flex bg-neutral rounded-xl">
    <img
      className="size-24 rounded-full self-center"
      src={src}
      alt="User Picture"
    />
    <blockquote className="grid gap-4 p-4">
      <p className="font-medium text-balance">"{text}"</p>
      <p className="text-blood self-end">
        <i className="pi pi-star"></i> {name}
      </p>
    </blockquote>
  </article>
);
