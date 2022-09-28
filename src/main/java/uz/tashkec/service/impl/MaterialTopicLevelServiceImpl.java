package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.MaterialTopicLevel;
import uz.tashkec.repository.MaterialTopicLevelRepository;
import uz.tashkec.service.MaterialTopicLevelService;
import uz.tashkec.service.dto.MaterialTopicLevelDTO;
import uz.tashkec.service.mapper.MaterialTopicLevelMapper;

/**
 * Service Implementation for managing {@link MaterialTopicLevel}.
 */
@Service
@Transactional
public class MaterialTopicLevelServiceImpl implements MaterialTopicLevelService {

    private final Logger log = LoggerFactory.getLogger(MaterialTopicLevelServiceImpl.class);

    private final MaterialTopicLevelRepository materialTopicLevelRepository;

    private final MaterialTopicLevelMapper materialTopicLevelMapper;

    public MaterialTopicLevelServiceImpl(
        MaterialTopicLevelRepository materialTopicLevelRepository,
        MaterialTopicLevelMapper materialTopicLevelMapper
    ) {
        this.materialTopicLevelRepository = materialTopicLevelRepository;
        this.materialTopicLevelMapper = materialTopicLevelMapper;
    }

    @Override
    public MaterialTopicLevelDTO save(MaterialTopicLevelDTO materialTopicLevelDTO) {
        log.debug("Request to save MaterialTopicLevel : {}", materialTopicLevelDTO);
        MaterialTopicLevel materialTopicLevel = materialTopicLevelMapper.toEntity(materialTopicLevelDTO);
        materialTopicLevel = materialTopicLevelRepository.save(materialTopicLevel);
        return materialTopicLevelMapper.toDto(materialTopicLevel);
    }

    @Override
    public MaterialTopicLevelDTO update(MaterialTopicLevelDTO materialTopicLevelDTO) {
        log.debug("Request to update MaterialTopicLevel : {}", materialTopicLevelDTO);
        MaterialTopicLevel materialTopicLevel = materialTopicLevelMapper.toEntity(materialTopicLevelDTO);
        materialTopicLevel = materialTopicLevelRepository.save(materialTopicLevel);
        return materialTopicLevelMapper.toDto(materialTopicLevel);
    }

    @Override
    public Optional<MaterialTopicLevelDTO> partialUpdate(MaterialTopicLevelDTO materialTopicLevelDTO) {
        log.debug("Request to partially update MaterialTopicLevel : {}", materialTopicLevelDTO);

        return materialTopicLevelRepository
            .findById(materialTopicLevelDTO.getId())
            .map(existingMaterialTopicLevel -> {
                materialTopicLevelMapper.partialUpdate(existingMaterialTopicLevel, materialTopicLevelDTO);

                return existingMaterialTopicLevel;
            })
            .map(materialTopicLevelRepository::save)
            .map(materialTopicLevelMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaterialTopicLevelDTO> findAll() {
        log.debug("Request to get all MaterialTopicLevels");
        return materialTopicLevelRepository
            .findAll()
            .stream()
            .map(materialTopicLevelMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MaterialTopicLevelDTO> findOne(Long id) {
        log.debug("Request to get MaterialTopicLevel : {}", id);
        return materialTopicLevelRepository.findById(id).map(materialTopicLevelMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete MaterialTopicLevel : {}", id);
        materialTopicLevelRepository.deleteById(id);
    }
}
